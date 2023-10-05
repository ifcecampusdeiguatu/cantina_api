import { ICheckinRepository } from "@modules/checkin/repositories/ICheckinRepository";
import { Status } from "@prisma/client";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  status: Status;
  user: {
    id: string;
    type: string;
  }
}

@injectable()
export class UpdateStatusUseCase {
  constructor(
    @inject("CheckinRepository")
    private checkinRepository: ICheckinRepository,
    @inject("DayjsProvider")
    private dayjsProvider: IDateProvider,
  ){}

  async execute({id, status, user}: IRequest){
    const checkin = await this.checkinRepository.findById(id);

    if(!checkin){
      throw new AppError("Checkin not found", 404);
    }

    if(checkin.status === "canceled"){
      throw new AppError("Check in was canceled");
    }

    if((status === "done" || status === "lacked") && user.type !== "servidor"){
      throw new AppError("User needs to be a Servidor");
    }

    if(!this.dayjsProvider.compareIfBefore(new Date(), checkin.expiresDate)){
      await this.checkinRepository.updateStatus({id, status:"lacked"});
    }else {
      await this.checkinRepository.updateStatus({id, status});
    }


  }
}
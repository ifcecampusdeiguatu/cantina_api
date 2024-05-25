type codeGeneratorData = string;
export function codeGenerator(
  amountOfLetter = 2,
  amountOfNumber = 4
): codeGeneratorData {
  let strings = "";
  let numbers = "";

  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < amountOfLetter; i++) {
    strings += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }

  for (let i = 0; i < amountOfNumber; i++) {
    numbers += Math.floor(Math.random() * 10);
  }

  return strings + numbers;
}

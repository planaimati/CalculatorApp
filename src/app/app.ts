/// interfejs

interface calculatorInterface {
  keys: NodeList;
  screen: HTMLParagraphElement;
  operation: null | string;
  smallText: HTMLParagraphElement;
  delete(): void;
  fillSmallText(value: string, operator: string): void;
  addListeners(): void;
  handleClick(e: Event): void;
  display(value: string): void;
}

class Calculator implements calculatorInterface {
  constructor(
    public keys: NodeList,
    public screen: HTMLDivElement,
    public operation: null | string,
    public smallText: HTMLParagraphElement
  ) {}

  flag: number = 1;
  firstValue: string = "";
  secondValue: string = "";

  //metoda odpowiedzialna za wyświetlanie danych na ekranie
  display(value: string) {
    this.screen.textContent = this.screen.textContent + value;
  }
  //reset
  reset() {
    this.flag = 1;
    this.firstValue = "";
    this.secondValue = "";
    this.screen.textContent = "";
    this.smallText.textContent = "";
  }
  //kasowanie danych z ekranu
  delete() {
    let lenght = this.screen.textContent.length;
    let newText = this.screen.textContent.slice(0, lenght - 1);
    this.screen.textContent = newText;
    lenght--;
  }

  fillValues(value: string) {
    if (this.flag === 1) {
      this.firstValue = this.firstValue + value;
    } else if (this.flag === 2) {
      this.secondValue = this.secondValue + value;
    }
  }

  //wyświetlanie danych na małym ekranie
  fillSmallText() {
    console.log(this.firstValue, this.secondValue);

    this.smallText.textContent = `${
      this.firstValue + this.operation + this.secondValue
    }`;
  }
  //metoda odpowiedzialna za dodawanie
  add() {
    const result = parseFloat(this.firstValue) + parseFloat(this.secondValue);
    this.screen.textContent = "";
    this.display(result.toFixed(2).toString());
  }

  subtraction() {
    let val1: number = parseFloat(this.firstValue);
    let val2: number = parseFloat(this.secondValue);

    let result: number = val1 - val2;

    console.log(result);
    console.log((1.2 - 1.1).toFixed(2));

    this.screen.textContent = "";
    this.display(result.toFixed(2).toString());
  }

  calculate() {
    console.log(this.operation);

    switch (this.operation) {
      case "+":
        this.add();
        break;
      case "-":
        this.subtraction();
        break;
    }
  }

  handleClick(e: Event) {
    const target = e.target as Element;
    const value = target.getAttribute("value");
    const parseIntValue = parseInt(value, 10);

    if (!isNaN(parseIntValue) || value === ".") {
      this.display(value);
      this.fillValues(value);
    }

    switch (value) {
      case "reset":
        this.reset();
        break;

      case "del":
        this.delete();
        break;

      case "+":
        this.operation = "+";
        this.fillSmallText();
        this.flag = 2;
        this.screen.textContent = "";
        break;

      case "=":
        this.calculate();
        this.fillSmallText();
        this.operation = "";
        break;

      case "-":
        this.operation = "-";
        this.fillSmallText();
        this.flag = 2;
        this.screen.textContent = "";
        break;
    }
  }

  addListeners() {
    this.keys.forEach((key) => {
      key.addEventListener("click", (e) => this.handleClick(e));
    });
  }
}

////////////////////////
const keys = document.querySelectorAll(".keyboardContainer__singleKey");
const display = document.querySelector(
  ".screenContainer__text"
) as HTMLParagraphElement;
const smallScreen = document.querySelector(
  ".screenContainer__smallText"
) as HTMLParagraphElement;

const calculator = new Calculator(keys, display, null, smallScreen);

calculator.addListeners();

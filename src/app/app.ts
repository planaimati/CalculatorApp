/// interfejs

interface calculatorInterface {
  keys: NodeList;
  screen: HTMLParagraphElement;
  operation: null | string;
  smallText: HTMLParagraphElement;
  result: boolean;
  addition(): void;
  subtraction(): void;
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
  result = false;
  firstValue: string = "";
  secondValue: string = "";

  //metoda odpowiedzialna za wyświetlanie danych na ekranie
  display(value: string) {
    this.screen.textContent = this.screen.textContent + value;
  }
  //reset wszystkich wprowadzonych danych
  reset() {
    this.result = false;
    this.flag = 1;
    this.firstValue = "";
    this.secondValue = "";
    this.screen.textContent = "";
    this.smallText.textContent = "";
  }
  //kasowanie wpisywanych danych
  delete() {
    let lenght = this.screen.textContent.length;
    let newText = this.screen.textContent.slice(0, lenght - 1);
    this.screen.textContent = newText;

    if (this.flag === 1) {
      this.firstValue = this.firstValue.slice(0, lenght - 1);
    } else if (this.flag === 2) {
      this.secondValue = this.secondValue.slice(0, lenght - 1);
    }

    lenght--;
  }
  //metoda przypisująca dane na podstawie których będą wykonywane operacje liczenia

  fillValues(value: string, flag?: boolean) {
    console.log(flag);
    console.log(this.flag);
    console.log();

    if (this.result) {
      this.firstValue = value;
      this.secondValue = "";
    }

    if (this.flag === 1 && flag) {
      this.firstValue = this.firstValue + value;
    }
//DO PRZEROBIENIA !!
    if (this.flag === 2 && this.result) {
      console.log(value);
      this.secondValue = " ";
    }

    if (this.flag === 2 && !this.result) {
      console.log(value);

      this.secondValue = this.secondValue + value;
    }
  }

  //wyświetlanie danych na małym ekranie

  fillSmallText() {
    console.log(
      `first value is: ${this.firstValue}, second value is: ${this.secondValue}`
    );

    this.smallText.textContent = `${
      this.firstValue + this.operation + this.secondValue
    }`;
  }
  //metoda odpowiedzialna za dodawanie

  addition() {
    let result = parseFloat(this.firstValue) + parseFloat(this.secondValue);
    this.screen.textContent = "";
    this.display(result.toFixed(2).toString());
    this.result = true;
  }
  //metoda odpowiedzialna za odejmowanie
  subtraction() {
    let result: number =
      parseFloat(this.firstValue) - parseFloat(this.secondValue);
    this.screen.textContent = "";
    this.display(result.toFixed(2).toString());
  }

  multiplication() {
    let result: number =
      parseFloat(this.firstValue) * parseFloat(this.secondValue);
    this.screen.textContent = "";
    this.display(result.toFixed(2).toString());
  }

  division() {
    let result: number =
      parseFloat(this.firstValue) / parseFloat(this.secondValue);
    this.screen.textContent = "";
    this.display(result.toFixed(2).toString());
  }
  //metoda która sprawdza jakie działanie ma zostać wykonane po czym wywołuje odpowiednią funkcję

  calculate() {
    switch (this.operation) {
      case "+":
        this.addition();
        break;
      case "-":
        this.subtraction();
        break;
      case "*":
        this.multiplication();
        break;
      case "/":
        this.division();
        break;
    }
  }

  handleClick(e: Event) {
    const target = e.target as Element;
    const value = target.getAttribute("value");
    const parseIntValue = parseInt(value, 10);

    if (!isNaN(parseIntValue) || value === ".") {
      this.display(value);
      this.fillValues(value, this.result ? true : false);
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
        this.fillValues(this.screen.textContent, true);
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

      case "*":
        this.operation = "*";
        this.fillSmallText();
        this.flag = 2;
        this.screen.textContent = "";
        break;

      case "/":
        this.operation = "/";
        this.fillSmallText();
        this.flag = 2;
        this.screen.textContent = "";
        break;
    }
  }

  // metoda która dodaje listenery na przyciski
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

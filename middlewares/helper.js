export class Helper {
  static firsLetterUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static capitalizeName(name) {
    if (name.includes("-")) {
      return name.split("-").map(el => this.firsLetterUpper(el)).join(" ");
    } else {
      return this.firsLetterUpper(name);
    }
  }
}


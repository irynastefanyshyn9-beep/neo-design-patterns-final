import { ResumeModel } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class HeaderBlock implements IBlock {
  constructor(private d: ResumeModel["header"]) {}

  render(): HTMLElement {
    const header = document.createElement("header");
    header.className = "section header";

    const { fullName, title, contacts } = this.d;
    const contactParts = [contacts.email, contacts.phone, contacts.location].filter(Boolean);

    header.innerHTML = `
      <h1>${fullName}</h1>
      <p>${title}</p>
      <p>${contactParts.join(" · ")}</p>
    `;

    return header;
  }
}

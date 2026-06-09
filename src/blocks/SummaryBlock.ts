import { ResumeModel } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class SummaryBlock implements IBlock {
  constructor(private d: ResumeModel["summary"]) {}

  render(): HTMLElement {
    const el = document.createElement("section");
    el.className = "section summary";

    const heading = document.createElement("h2");
    heading.textContent = "Summary";
    el.appendChild(heading);

    const p = document.createElement("p");
    p.textContent = this.d.text;
    el.appendChild(p);

    return el;
  }
}

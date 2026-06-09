import { Education } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class EducationBlock implements IBlock {
  constructor(private d: Education[]) {}

  render(): HTMLElement {
    const el = document.createElement("section");
    el.className = "section education";
    const heading = document.createElement("h2");
    heading.textContent = "Education";
    el.appendChild(heading);

    for (const edu of this.d) {
      const item = document.createElement("div");
      item.className = "education-item";
      item.innerHTML = `<strong>${edu.institution}</strong> — ${edu.degree} in ${edu.field} (${edu.graduation})`;
      el.appendChild(item);
    }

    return el;
  }
}

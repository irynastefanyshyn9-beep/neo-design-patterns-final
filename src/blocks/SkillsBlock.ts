import { Skills } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class SkillsBlock implements IBlock {
  constructor(private d: Skills) {}

  render(): HTMLElement {
    const sec = document.createElement("section");
    sec.className = "section skills";

    const heading = document.createElement("h2");
    heading.textContent = "Skills";
    sec.appendChild(heading);

    for (const [category, items] of Object.entries(this.d)) {
      const label = document.createElement("p");
      label.innerHTML = `<strong>${category.charAt(0).toUpperCase() + category.slice(1)}:</strong>`;
      sec.appendChild(label);

      const ul = document.createElement("ul");
      ul.className = "skills-list";
      for (const skill of items) {
        const li = document.createElement("li");
        li.textContent = skill;
        ul.appendChild(li);
      }
      sec.appendChild(ul);
    }

    return sec;
  }
}

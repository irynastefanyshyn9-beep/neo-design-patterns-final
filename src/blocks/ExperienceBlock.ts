import { Experience } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";
import { ProjectBlock } from "./ProjectBlock";
import { HighlightDecorator } from "../decorators/HighlightDecorator";

/**
 * Composite: renders multiple experience entries, each containing child ProjectBlocks.
 */
export class ExperienceBlock implements IBlock {
  constructor(private d: Experience[]) {}

  render(): HTMLElement {
    const container = document.createElement("section");
    container.className = "section experience";
    const heading = document.createElement("h2");
    heading.textContent = "Experience";
    container.appendChild(heading);

    for (const exp of this.d) {
      const item = document.createElement("div");
      item.className = "experience-item";
      item.innerHTML = `<strong>${exp.position}</strong> at ${exp.company} (${exp.start} – ${exp.end})`;

      for (const project of exp.projects) {
        const projectBlock: IBlock = new ProjectBlock(project);
        const decorated = project.isRecent
          ? new HighlightDecorator(projectBlock)
          : projectBlock;
        item.appendChild(decorated.render());
      }

      container.appendChild(item);
    }

    return container;
  }
}

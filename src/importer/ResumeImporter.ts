import { AbstractImporter } from "./AbstractImporter";
import { ResumeModel } from "../models/ResumeModel";
import { BlockFactory, BlockType } from "../blocks/BlockFactory";

export class ResumeImporter extends AbstractImporter<ResumeModel> {
  protected validate(): void {
    const required: Array<keyof ResumeModel> = [
      "header",
      "summary",
      "experience",
      "education",
      "skills",
    ];
    const data = this.raw as Record<string, unknown>;
    for (const key of required) {
      if (!data[key]) {
        throw new Error(`Invalid resume JSON: missing required field "${key}"`);
      }
    }
  }

  protected map(): ResumeModel {
    return this.raw as ResumeModel;
  }

  protected render(model: ResumeModel): void {
    const root = document.getElementById("resume-content")!;
    const factory = new BlockFactory();

    const blockTypes: BlockType[] = [
      "header",
      "summary",
      "experience",
      "education",
      "skills",
    ];

    for (const type of blockTypes) {
      root.appendChild(factory.createBlock(type, model).render());
    }
  }
}

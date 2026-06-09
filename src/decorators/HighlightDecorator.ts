import { IBlock } from "../blocks/BlockFactory";

/**
 * Decorator: wraps an IBlock and adds the .highlight CSS class to mark recent projects.
 */
export class HighlightDecorator implements IBlock {
  constructor(private wrapped: IBlock) {}

  render(): HTMLElement {
    const el = this.wrapped.render();
    el.classList.add("highlight");
    return el;
  }
}

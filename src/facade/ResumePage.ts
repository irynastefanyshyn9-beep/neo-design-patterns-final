import { ResumeImporter } from "../importer/ResumeImporter";

/**
 * Facade: single entry point that hides loading, parsing, and rendering complexity.
 */
export class ResumePage {
  async init(jsonPath: string): Promise<void> {
    const raw = await this.fetchData(jsonPath);
    new ResumeImporter(raw).import();
  }

  private async fetchData(path: string): Promise<unknown> {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load resume data: ${response.statusText}`);
    }
    return response.json();
  }
}

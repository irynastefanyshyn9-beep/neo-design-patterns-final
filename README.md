Resume Generator — Design Patterns Final

A dynamic resume page built from `resume.json` using five Gang-of-Four design patterns in TypeScript + Vite.

---

How to run

bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
```

---

Design patterns

1. Facade — `src/facade/ResumePage.ts`
`ResumePage.init(jsonPath)` is the single public entry point. It hides three steps — fetching JSON, validating + mapping it, and rendering to the DOM — behind one async call. `main.ts` only ever calls `new ResumePage().init("/resume.json")`.

2. Template Method — `src/importer/AbstractImporter.ts` / `ResumeImporter.ts`
`AbstractImporter` defines the fixed algorithm skeleton: `validate() → map() → render()`. The concrete `ResumeImporter` fills in each abstract step:
- `validate()` — checks all five required keys exist in the raw JSON.
- `map()` — casts the raw object to the typed `ResumeModel`.
- `render()` — iterates block types and hands each one to `BlockFactory`.

3. Factory Method — `src/blocks/BlockFactory.ts`
`BlockFactory.createBlock(type, model)` encapsulates which class to instantiate for each block type (`header`, `summary`, `experience`, `education`, `skills`). Callers never import individual block classes; they only depend on the `IBlock` interface.

4. Composite — `src/blocks/ExperienceBlock.ts` / `ProjectBlock.ts`
`ExperienceBlock` is the composite node: it owns a list of `Experience` entries and, for each one, creates child `ProjectBlock` leaf nodes and appends their rendered elements. `ProjectBlock` is the leaf — it has no children and just renders one project row.

5. Decorator — `src/decorators/HighlightDecorator.ts`
`HighlightDecorator` wraps any `IBlock`, delegates `render()` to the inner block, then adds the `.highlight` CSS class to the returned element. It is applied in `ExperienceBlock` only when `project.isRecent === true`, with zero changes to `ProjectBlock` itself.

---

Adding a new block (e.g. "Certificates")

1. Add types — extend `ResumeModel` in `src/models/ResumeModel.ts` with a `certificates` field.
2. Add data — add a `"certificates"` array to `resume.json`.
3. Create the block — add `src/blocks/CertificatesBlock.ts` implementing `IBlock`.
4. Register in factory — add one `case "certificates": return new CertificatesBlock(m.certificates);` branch to `BlockFactory.createBlock()` and add `"certificates"` to the `BlockType` union.
5. Include in render — add `"certificates"` to the `blockTypes` array in `ResumeImporter.render()`.

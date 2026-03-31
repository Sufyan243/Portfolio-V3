# Neuromap

A desktop mind-mapping application built with JavaFX that lets you visually organise ideas as an interactive node graph — with AI-powered idea expansion, real-time facial emotion detection, collaborative map sharing, and a rich theming system.

---

## What is Neuromap?

Neuromap is a **visual thinking tool**. You create idea nodes on an infinite canvas, connect them, drill into sub-maps for deeper thinking, and let the app assist you through two intelligent layers:

- **AI Expansion** — right-click any node and ask the Hugging Face API to generate 5 related concepts, which are automatically placed and connected around the parent node.
- **Emotion Detection** — your webcam continuously analyses your facial expression using OpenCV + a FER+ ONNX model. When "Emotion Colors" mode is on, node colours shift in real time to reflect your detected mood (joy → gold, anger → red, fear → slate-blue, etc.).

Maps can be saved locally as JSON, shared with other registered users with `view` or `edit` permissions, and loaded back at any time.

---

## Problem it Solves

Traditional mind-mapping tools are static and passive. Neuromap addresses three gaps:

| Problem | Neuromap's Answer |
|---|---|
| Blank-canvas paralysis — you don't know what to add next | AI expansion generates related ideas instantly |
| Emotional context is lost when reviewing old maps | Emotion-colour mode embeds your mood at creation time into the visual |
| Mind maps are siloed per user | Collaborative sharing with permission levels (view / edit) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Java 21 |
| UI Framework | JavaFX 21.0.7 (FXML + programmatic) |
| Computer Vision | OpenCV 4.11.0 (face detection via Haar Cascade) |
| Emotion Model | FER+ ONNX model (`emotion-ferplus-8.onnx`) via OpenCV DNN |
| AI / NLP | Hugging Face Inference API (text-generation endpoint) |
| Database | SQLite via `sqlite-jdbc 3.49.1.0` |
| JSON | Google Gson 2.10.1 |
| Build / IDE | Apache Ant + NetBeans (nbproject) |
| Themes | CSS stylesheets (10 built-in themes) |

---

## Architecture

The project follows a layered MVC-style architecture:

```
┌─────────────────────────────────────────────────────┐
│                     UI Layer                        │
│  TitleScreen · MainCanvasView · NeuromapCanvas      │
│  ControlsPane · BreadcrumbBar · ShareDialog         │
│  ThemeManager · ContextMenuHandler                  │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│                Controllers (FXML)                   │
│  WelcomeController · LoginController                │
│  SignupController · DashboardController             │
│  ShareDialogController                              │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│                  Model Layer                        │
│  IdeaNode · Connection · CanvasState (Memento)      │
│  MapModel · Memento · NodeActionEvent               │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│               Services / Utils                      │
│  AIService (Hugging Face) · WebcamFeedService       │
│  ShareService · EmotionAnalyzer · FileManager       │
│  ZoomManager · ParticleEmitter · AnimationUtil      │
│  RippleEffect · JsonParserUtils                     │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│              Data / Auth Layer                      │
│  DatabaseManager (SQLite) · UserDAO · SharedMapDAO  │
│  AuthService · SessionManager · User                │
└─────────────────────────────────────────────────────┘
```

### Key Design Patterns Used

- **Memento** — `CanvasState` maintains undo/redo stacks by deep-copying node and connection lists before every mutation.
- **Observer / Listener** — `IdeaNode` fires `PositionListener` and `DeepDiveListener` callbacks; `NeuromapCanvas` wires these up to keep connections live and enable sub-map navigation.
- **Singleton** — `CanvasState.getInstance()` provides a single shared undo/redo history.
- **Service Layer** — `ShareService` and `AIService` are stateless utility classes that isolate external I/O from the UI.

---

## Database Schema

Four SQLite tables, created automatically on first launch:

```sql
users        (id, username, password, email)
nodes        (id, text, x, y, color)
maps         (id, user_id, title, data, created_at, updated_at)
shared_maps  (id, map_id, owner_id, shared_with_user_id, permission, shared_at)
```

`permission` is constrained to `'view'` or `'edit'`.

---

## Features

### Canvas
- Double-click empty space → create a new idea node
- Double-click a node → drill into its sub-map (infinite nesting)
- Right-click a node → context menu: change shape (Rectangle / Ellipse / Hexagon / Triangle) or trigger AI expansion
- Left-click to select; right-click a second node to draw a directed connection
- Scroll wheel → zoom in/out
- Middle-mouse drag → pan the canvas
- `Ctrl+Z` / `Ctrl+Y` → undo / redo

### Node Types
| Type | Shape | Semantic meaning |
|---|---|---|
| IDEA | Rounded Rectangle | General concept |
| QUESTION | Ellipse | Open question |
| TASK | Hexagon | Actionable item |
| DECISION | Triangle | Decision point |

### Emotion Mode
When toggled on, each node's colour is driven by the emotion detected in its text (keyword-based via `EmotionAnalyzer`) or by your live webcam expression (via `WebcamFeedService` + FER+ model):

| Emotion | Colour |
|---|---|
| Joy | Light Golden Rod Yellow |
| Sadness | Cornflower Blue |
| Anger | Firebrick |
| Fear | Slate Blue |
| Surprise | Orange |
| Neutral | Light Gray |

### Themes (10 built-in)
Dark · Light · Cyberpunk · Retro Terminal · Minimal White · Ocean Blue · Midnight Jazz · Solarized Dark · Gruvbox · Neon Night

Theme preference is persisted to `config.json`.

### Sharing
- Registered users can share any owned map with another user by email.
- Permission can be `view` or `edit`.
- Shared maps appear in the recipient's Dashboard under "Shared Maps".
- Map data is serialised to JSON and stored in `src/shared_maps/map_<id>.json`.

### Save / Load
- Maps are serialised to JSON (`nodes` array + `connections` array).
- Save via toolbar or `FileChooser`; load the same way.
- Auto-save state is persisted to `autosave.ser`.

---

## Project Structure

```
neuromap2/                      ← NetBeans project wrapper
├── lib/
│   ├── sqlite-jdbc-3.49.1.0.jar
│   └── com.google.gson.jar.jar
├── resources/
│   ├── haarcascade_frontalface_default.xml   ← OpenCV face detector
│   └── emotion-ferplus-8.onnx                ← FER+ emotion model
├── config.json                 ← persisted theme preference
└── nbproject/                  ← Ant build configuration

D:\Neuromap\src\                ← actual source root (referenced via relative path)
├── app/          MainApp.java
├── auth/         AuthService · SessionManager · User
├── controllers/  FXML controllers (Login, Signup, Dashboard, Welcome, ShareDialog)
├── db/           DatabaseManager · UserDAO · SharedMapDAO · MapModel
├── model/        IdeaNode · Connection · CanvasState · Memento · MapModel
├── services/     AIService · WebcamFeedService · ShareService
├── ui/           NeuromapCanvas · MainCanvasView · ControlsPane · ThemeManager
│                 TitleScreen · BreadcrumbBar · ShareDialog · ContextMenuHandler
├── utils/        FileManager · EmotionAnalyzer · ZoomManager · ParticleEmitter
│                 RippleEffect · AnimationUtil · JsonParserUtils
├── views/        Dashboard.fxml · Login.fxml · Signup.fxml · Welcome.fxml · ShareDialog.fxml
├── Themes/       10 × .css files
└── module-info.java
```

---

## Prerequisites

| Requirement | Version |
|---|---|
| JDK | 21+ |
| JavaFX SDK | 21.0.7 |
| OpenCV | 4.11.0 (with Java bindings + native `.dll` in `build/java/x64`) |
| NetBeans | 17+ (or any Ant-compatible build tool) |

---

## Setup & Run

1. **Clone / extract** the project so that `D:\Neuromap\src` exists (the NetBeans project at `neuromap2` references it via a relative path `../../../Neuromap/src`).

2. **Install JavaFX SDK** to `D:\Java\JavFx_sdk\javafx-sdk-21.0.7\`.

3. **Install OpenCV 4.11.0** to `D:\opencv\`. Ensure `opencv-4110.jar` and the native library `x64\opencv_java4110.dll` are present.

4. **Open `neuromap2`** in NetBeans. All library references are pre-configured in `nbproject/project.properties`.

5. **Run** — NetBeans will launch `app.MainApp`. The SQLite database is created automatically at `D:\Neuromap\src\db\neuromap.db` on first run.

6. **Webcam** — the emotion detection thread starts automatically. If no webcam is found, the canvas still works normally; the expression label will remain at "Expression: neutral".

### JVM arguments (already set in project.properties)
```
--module-path D:\Java\JavFx_sdk\javafx-sdk-21.0.7\lib
--add-modules javafx.controls,javafx.fxml,javafx.graphics
-Djava.library.path=D:\opencv\build\java\x64
```

---

## Configuration

`config.json` (project root) stores the last-used theme:
```json
{ "theme": "LIGHT" }
```
This file is read on startup and written whenever the user changes the theme via the toolbar dropdown.

---

## Known Limitations / TODOs

- Passwords are stored in plain text — hashing (e.g. BCrypt) should be added before any production use.
- The Hugging Face API key is hardcoded in `AIService.java` — move to an environment variable or config file.
- The `DatabaseManager` DB URL is an absolute hardcoded path (`D:/Neuromap/src/db/neuromap.db`) — should be made relative or configurable.
- The "Open Map" button in `DashboardController` has a TODO placeholder and does not yet load the map into the canvas.
- `autosave.ser` uses Java serialisation — consider migrating to JSON for portability.

---

## Author

**NAVEED** — as declared in `nbproject/project.properties` (`application.vendor=NAVEED`).

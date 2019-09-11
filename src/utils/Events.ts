import { on, off, emit } from "kontra/src/events";

type GameEvent = "MAGIC_PLATFORM_GONE" | "FLOATY_GEM_COLLECTED";

class Events {
  on(event: GameEvent, callback: any) {
    on(event, callback);
  }

  off(event: GameEvent, callback: any) {
    off(event, callback);
  }

  emit(event: GameEvent, ...args: any) {
    emit(event, ...args);
  }
}

export default new Events();
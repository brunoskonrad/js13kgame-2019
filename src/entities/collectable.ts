type Collect = () => void;

export function collectableEntity(collect: Collect) {
  return {
    collectable: true,
    wasCollected: false,
    collect() {
      this.wasCollected = true;
      collect();
    }
  };
}

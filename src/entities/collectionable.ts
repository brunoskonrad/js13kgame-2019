type Collect = () => void;

export function collectionableEntity(collect: Collect) {
  return {
    collectable: true,
    wasCollected: false,
    collect() {
      this.wasCollected = true;
      collect();
    }
  };
}

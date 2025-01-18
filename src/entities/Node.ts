export class Node {
    row: number;
    col: number;
    top: Node | null = null;
    bottom: Node | null = null;
    left: Node | null = null;
    right: Node | null = null;
    isBush: boolean;
    isRock: boolean;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.isBush = false;
        this.isRock = false;
    }

    doBush(node: Node) {
        node.isBush = true;
    }

    doRock(node: Node) {
        node.isRock = true;
        this.disconnectNode(node);
    }

    disconnectNode(node: Node) {
        if (node.top) node.top.bottom = null;
        if (node.bottom) node.bottom.top = null;
        if (node.left) node.left.right = null;
        if (node.right) node.right.left = null;

        node.top = null;
        node.bottom = null;
        node.left = null;
        node.right = null;
    }
}

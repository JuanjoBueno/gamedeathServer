// Board.ts
import { Node } from "./Node";

export class Board {
    size: number;
    nodes: Node[][];

    constructor(size: number) {
        this.size = size;
        this.nodes = Array.from({ length: size }, (_, row) =>
            Array.from({ length: size }, (_, col) => new Node(row, col))
        );

        this.initializeBoard();
        this.randomizeNodes();
    }

    private initializeBoard() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const node = this.nodes[row][col];

                if (row > 0) node.top = this.nodes[row - 1][col];
                if (row < this.size - 1) node.bottom = this.nodes[row + 1][col];
                if (col > 0) node.left = this.nodes[row][col - 1];
                if (col < this.size - 1) node.right = this.nodes[row][col + 1];
            }
        }
    }

    private getRandomNodes(count: number): Node[] {
        const allNodes = this.nodes.flat();
        const selectedNodes: Node[] = [];

        while (selectedNodes.length < count && allNodes.length > 0) {
            const randomIndex = Math.floor(Math.random() * allNodes.length);
            const [node] = allNodes.splice(randomIndex, 1);
            selectedNodes.push(node);
        }

        return selectedNodes;
    }

    private randomizeNodes() {
        const halfSize = Math.floor(this.size / 2);
        const bushNodes = this.getRandomNodes(halfSize);
        const rockNodes = this.getRandomNodes(halfSize);

        bushNodes.forEach((node) => (node.isBush = true));
        rockNodes.forEach((node) => (node.isRock = true));
    }

    getBoardState() {
        return this.nodes.map((row) =>
            row.map((node) => ({
                row: node.row,
                col: node.col,
                top: node.top ? { row: node.top.row, col: node.top.col } : null,
                bottom: node.bottom
                    ? { row: node.bottom.row, col: node.bottom.col }
                    : null,
                left: node.left
                    ? { row: node.left.row, col: node.left.col }
                    : null,
                right: node.right
                    ? { row: node.right.row, col: node.right.col }
                    : null,
                isBush: node.isBush,
                isRock: node.isRock,
            }))
        );
    }
}

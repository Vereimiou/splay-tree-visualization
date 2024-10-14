// splayTree.js
class Node {
    constructor(data, theLeft = null, theRight = null) {
        this.element = data;
        this.leftChild = theLeft;
        this.rightChild = theRight;
        this.time = 1;
        this.color = 0;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function changeKValue() {
    const selectedValue = document.getElementById('kSelector').value;
    k = selectedValue == '自顶向下';
    console.log(k);
}

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('speedSlider');
    const speedDisplay = document.getElementById('speedDisplay');

    function updateSpeed() {
        speed = parseInt(slider.value);
        speedDisplay.textContent = speed;
    }

    slider.addEventListener('input', updateSpeed);
    updateSpeed();
});

let current;
let k = true;
let speed = 500;
class SplayTree {
    constructor() {
        this.root = null;
        this.left = null;
        this.right = null;
        this.size = 0;
    }
    async insert(element) {
        if (this.root == null) {
            this.root = new Node(element);
            this.size++;
            return;
        }

        if (k) {
            let temp = new Node(0);
            let left = temp, right = temp;
            this.left = temp.rightChild;
            this.right = temp.leftChild;
            while (this.root.element !== element) {
                current = this.root
                this.left = temp.rightChild;
                this.right = temp.leftChild;
                await draw();
                await sleep(speed)
                if (this.root.element < element) {
                    let nextNode = this.root.rightChild;
                    if (nextNode == null) break;
                    if (nextNode.element < element && nextNode.rightChild !== null) {
                        this.root.rightChild = nextNode.leftChild;
                        nextNode.leftChild = this.root;
                        this.root = nextNode;
                    }//RR旋转
                    left.rightChild = this.root;
                    left = this.root;
                    this.root = this.root.rightChild;
                    left.rightChild = null;
                }
                else {
                    let nextNode = this.root.leftChild;
                    if (nextNode == null) break;
                    if (nextNode.element > element && nextNode.leftChild !== null) {
                        this.root.leftChild = nextNode.rightChild;
                        nextNode.rightChild = this.root;
                        this.root = nextNode;
                    }//LL旋转
                    right.leftChild = this.root;
                    right = this.root;
                    this.root = this.root.leftChild;
                    right.leftChild = null;
                }
            }
            left.rightChild = this.root.leftChild;
            right.leftChild = this.root.rightChild;
            this.root.leftChild = temp.rightChild;
            this.root.rightChild = temp.leftChild;
            this.left = null;
            this.right = null;
            current = this.root
            await draw();
            await sleep(speed)
        }
        else {
            let order = new Array;
            current = this.root;
            while (current.element != element) {
                await draw();
                await sleep(speed)
                order.push(current);
                if (current.element > element) {
                    if (current.leftChild == null) break;
                    current = current.leftChild;
                } else {
                    if (current.rightChild == null) break;
                    current = current.rightChild;
                }
            }
            if (current.element != element) order.pop();
            for (let i = order.length - 1; i >= 0; i--) {
                await draw();
                await sleep(speed)
                if (i - 1 >= 0) {
                    i = i - 1;
                    if (order[i].leftChild == order[i + 1] && order[i + 1].leftChild == current) {
                        order[i].leftChild = order[i + 1].rightChild;
                        order[i + 1].rightChild = order[i];
                        order[i + 1].leftChild = current.rightChild;
                        current.rightChild = order[i + 1];
                    } else if (order[i].rightChild == order[i + 1] && order[i + 1].rightChild == current) {
                        order[i].rightChild = order[i + 1].leftChild;
                        order[i + 1].leftChild = order[i];
                        order[i + 1].rightChild = current.leftChild;
                        current.leftChild = order[i + 1];
                    } else if (order[i].leftChild == order[i + 1] && order[i + 1].rightChild == current) {
                        order[i].leftChild = current.rightChild;
                        order[i + 1].rightChild = current.leftChild;
                        current.leftChild = order[i + 1];
                        current.rightChild = order[i];
                    } else if (order[i].rightChild == order[i + 1] && order[i + 1].leftChild == current) {
                        order[i].rightChild = current.leftChild;
                        order[i + 1].leftChild = current.rightChild;
                        current.rightChild = order[i + 1];
                        current.leftChild = order[i];
                    }
                    if (i - 1 >= 0) {
                        if (order[i - 1].leftChild == order[i]) order[i - 1].leftChild = current;
                        else order[i - 1].rightChild = current;
                    }
                } else {
                    if (current == order[i].leftChild) {
                        order[i].leftChild = current.rightChild;
                        current.rightChild = order[i];
                    }
                    else if (current == order[i].rightChild) {
                        order[i].rightChild = current.leftChild;
                        current.leftChild = order[i];
                    }
                }
            }
            this.root = current;
            let nodeList = splaytree.inOrder();
            nodeList.forEach((node) => {
                if (node == splaytree.root) node.color = 0;
                else node.color = Math.min(node.color + 34, 255);
            })
            await draw();
            await sleep(speed)
        }
        if (this.root.element == element) {
            this.root.time++;
        }
        else {
            let temp = new Node(element);
            if (this.root.element > element) {
                temp.leftChild = this.root.leftChild;
                temp.rightChild = this.root;
                this.root.leftChild = null;
            }
            else {
                temp.leftChild = this.root;
                temp.rightChild = this.root.rightChild;
                this.root.rightChild = null;
            }
            this.size++;
            this.root = temp;
        }
        current = null
        let nodeList = splaytree.inOrder();
        nodeList.forEach((node) => {
            if (node == splaytree.root) node.color = 0;
            else node.color = Math.min(node.color + 34, 255);
        })
        await draw()
    }
    async erase(element) {
        if (this.root == null) return false;
        if (k) {
            let temp = new Node(0);
            let left = temp, right = temp;
            this.left = temp.rightChild;
            this.right = temp.leftChild;
            while (this.root.element !== element) {
                current = this.root
                this.left = temp.rightChild;
                this.right = temp.leftChild;
                await draw();
                await sleep(speed)
                if (this.root.element < element) {
                    let nextNode = this.root.rightChild;
                    if (nextNode == null) break;
                    if (nextNode.element < element && nextNode.rightChild !== null) {
                        this.root.rightChild = nextNode.leftChild;
                        nextNode.leftChild = this.root;
                        this.root = nextNode;
                    }//RR旋转
                    left.rightChild = this.root;
                    left = this.root;
                    this.root = this.root.rightChild;
                    left.rightChild = null;
                }
                else {
                    let nextNode = this.root.leftChild;
                    if (nextNode == null) break;
                    if (nextNode.element > element && nextNode.leftChild !== null) {
                        this.root.leftChild = nextNode.rightChild;
                        nextNode.rightChild = this.root;
                        this.root = nextNode;
                    }//LL旋转
                    right.leftChild = this.root;
                    right = this.root;
                    this.root = this.root.leftChild;
                    right.leftChild = null;
                }
            }
            left.rightChild = this.root.leftChild;
            right.leftChild = this.root.rightChild;
            this.root.leftChild = temp.rightChild;
            this.root.rightChild = temp.leftChild;
            this.left = null;
            this.right = null;
            current = this.root
            await draw();
            await sleep(speed)
        }
        else {
            let order = new Array;
            current = this.root;
            while (current.element != element) {
                await draw();
                await sleep(speed)
                order.push(current);
                if (current.element > element) {
                    if (current.leftChild == null) break;
                    current = current.leftChild;
                } else {
                    if (current.rightChild == null) break;
                    current = current.rightChild;
                }
            }
            if (current.element != element) order.pop();
            for (let i = order.length - 1; i >= 0; i--) {
                await draw();
                await sleep(speed)
                if (i - 1 >= 0) {
                    i = i - 1;
                    if (order[i].leftChild == order[i + 1] && order[i + 1].leftChild == current) {
                        order[i].leftChild = order[i + 1].rightChild;
                        order[i + 1].rightChild = order[i];
                        order[i + 1].leftChild = current.rightChild;
                        current.rightChild = order[i + 1];
                    } else if (order[i].rightChild == order[i + 1] && order[i + 1].rightChild == current) {
                        order[i].rightChild = order[i + 1].leftChild;
                        order[i + 1].leftChild = order[i];
                        order[i + 1].rightChild = current.leftChild;
                        current.leftChild = order[i + 1];
                    } else if (order[i].leftChild == order[i + 1] && order[i + 1].rightChild == current) {
                        order[i].leftChild = current.rightChild;
                        order[i + 1].rightChild = current.leftChild;
                        current.leftChild = order[i + 1];
                        current.rightChild = order[i];
                    } else if (order[i].rightChild == order[i + 1] && order[i + 1].leftChild == current) {
                        order[i].rightChild = current.leftChild;
                        order[i + 1].leftChild = current.rightChild;
                        current.rightChild = order[i + 1];
                        current.leftChild = order[i];
                    }
                    if (i - 1 >= 0) {
                        if (order[i - 1].leftChild == order[i]) order[i - 1].leftChild = current;
                        else order[i - 1].rightChild = current;
                    }
                } else {
                    if (current == order[i].leftChild) {
                        order[i].leftChild = current.rightChild;
                        current.rightChild = order[i];
                    }
                    else if (current == order[i].rightChild) {
                        order[i].rightChild = current.leftChild;
                        current.leftChild = order[i];
                    }
                }
            }
            this.root = current;
            await draw();
            await sleep(speed)
        }
        if (this.root.element !== element) return true;
        else {
            if (this.root.time > 1) this.root.time--;
            else if (this.root.leftChild == null) {
                this.root = this.root.rightChild;
                this.size--;
            }
            else if (this.root.rightChild == null) {
                this.root = this.root.leftChild;
            }
            else {
                if (k) {
                    let temp = new Node(0);
                    let left = temp, right = temp;
                    this.left = temp.rightChild;
                    this.right = temp.leftChild;
                    while (this.root.leftChild.element !== element) {
                        this.left = temp.rightChild;
                        this.right = temp.leftChild;
                        await draw();
                        await sleep(speed)
                        console.log(111)
                        if (this.root.leftChild.element < element) {
                            let nextNode = this.root.leftChild.rightChild;
                            if (nextNode == null) break;
                            if (nextNode.element < element && nextNode.rightChild !== null) {
                                this.root.leftChild.rightChild = nextNode.leftChild;
                                nextNode.leftChild = this.root.leftChild;
                                this.root.leftChild = nextNode;
                            }//RR旋转
                            left.rightChild = this.root.leftChild;
                            left = this.root.leftChild;
                            this.root.leftChild = this.root.leftChild.rightChild;
                            left.rightChild = null;
                        }
                        else {
                            let nextNode = this.root.leftChild.leftChild;
                            if (nextNode == null) break;
                            if (nextNode.element > element && nextNode.leftChild !== null) {
                                this.root.leftChild.leftChild = nextNode.rightChild;
                                nextNode.rightChild = this.root.leftChild;
                                this.root.leftChild = nextNode;
                            }//LL旋转
                            right.leftChild = this.root.leftChild;
                            right = this.root.leftChild;
                            this.root.leftChild = this.root.leftChild.leftChild;
                            right.leftChild = null;
                        }
                    }
                    left.rightChild = this.root.leftChild.leftChild;
                    right.leftChild = this.root.leftChild.rightChild;
                    this.root.leftChild.leftChild = temp.rightChild;
                    this.root.leftChild.rightChild = temp.leftChild;
                    this.left = null;
                    this.right = null;
                    await draw();
                    await sleep(speed)
                }
                else {
                    let order = new Array;
                    current = this.root.leftChild;
                    while (current.element != element) {
                        order.push(current);
                        if (current.element > element) {
                            if (current.leftChild == null) break;
                            current = current.leftChild;
                        } else {
                            if (current.rightChild == null) break;
                            current = current.rightChild;
                        }
                    }
                    if (current.element != element) order.pop();
                    for (let i = order.length - 1; i >= 0; i--) {
                        await draw();
                        await sleep(speed)
                        if (i - 1 >= 0) {
                            i = i - 1;
                            if (order[i].leftChild == order[i + 1] && order[i + 1].leftChild == current) {
                                order[i].leftChild = order[i + 1].rightChild;
                                order[i + 1].rightChild = order[i];
                                order[i + 1].leftChild = current.rightChild;
                                current.rightChild = order[i + 1];
                            } else if (order[i].rightChild == order[i + 1] && order[i + 1].rightChild == current) {
                                order[i].rightChild = order[i + 1].leftChild;
                                order[i + 1].leftChild = order[i];
                                order[i + 1].rightChild = current.leftChild;
                                current.leftChild = order[i + 1];
                            } else if (order[i].leftChild == order[i + 1] && order[i + 1].rightChild == current) {
                                order[i].leftChild = current.rightChild;
                                order[i + 1].rightChild = current.leftChild;
                                current.leftChild = order[i + 1];
                                current.rightChild = order[i];
                            } else if (order[i].rightChild == order[i + 1] && order[i + 1].leftChild == current) {
                                order[i].rightChild = current.leftChild;
                                order[i + 1].leftChild = current.rightChild;
                                current.rightChild = order[i + 1];
                                current.leftChild = order[i];
                            }
                            if (i - 1 >= 0) {
                                if (order[i - 1].leftChild == order[i]) order[i - 1].leftChild = current;
                                else order[i - 1].rightChild = current;
                            }
                        } else {
                            if (current == order[i].leftChild) {
                                order[i].leftChild = current.rightChild;
                                current.rightChild = order[i];
                            }
                            else if (current == order[i].rightChild) {
                                order[i].rightChild = current.leftChild;
                                current.leftChild = order[i];
                            }
                        }
                    }
                    this.root.leftChild = current;
                    await draw();
                    await sleep(speed)
                }
                this.root.leftChild.rightChild = this.root.rightChild;
                this.root = this.root.leftChild;
            }
        }
        await draw()
        await sleep(speed)
        return true;
    }
    minEle(u) {
        if (this.root == null) return null;
        let currentNode = this.root;
        while (currentNode.rightChild == null) currentNode = currentNode.rightChild;
        return currentNode;
    }
    maxEle(u) {
        if (this.root == null) return null;
        let currentNode = this.root;
        while (currentNode.leftChild !== null) currentNode = currentNode.leftChild;
        return currentNode;
    }
    getRoot() {
        return this.root;
    }
    empty() {
        return this.size == 0;
    }
    chainClean(u) {
        if (u !== null) {
            chainClean(u.leftChild);
            chainClean(u.rightChild);
            u = null;
            this.size--;
        }
    }
    copyNode(v) {
        if (v !== null) {
            const newNode = new Node(0);
            newNode.leftChild = this.copyNode(v.leftChild);
            newNode.rightChild = this.copyNode(v.rightChild);
            newNode.element = v.element;
            return newNode;
        }
        return null;
    }
    clean() {
        chainClean(this.root);
    }
    inOrder() {
        if (this.root == null) return [];
        let st = true;
        let order = [];
        let t = [];
        t.push(this.root);
        while (t.length) {
            if (st) {
                if (t[t.length - 1].leftChild != null) {
                    t.push(t[t.length - 1].leftChild);
                } else st = false;
            }
            if (!st) {
                order.push(t[t.length - 1]);
                t.pop();
                if (order[order.length - 1].rightChild != null) {
                    t.push(order[order.length - 1].rightChild);
                    st = true;
                }
            }
        }
        return order;
    }
}

async function init() {
    buttons(true)
    for (let i = 1; i <= 5; i++) {
        await splaytree.insert(Math.floor(Math.random() * (1000 - 1 + 1)) + 1)
    }
    await draw()
    buttons(false)
}

let body = document.querySelector('body');

async function draw() {
    renderNodes(splaytree.left, 'left');
    renderNodes(splaytree.root, 'center');
    renderNodes(splaytree.right, 'right');

    let nodeList = document.querySelectorAll(".node");
    let vnodeList = document.querySelectorAll(".v-node");
    let idsArray = [];
    nodeList.forEach(function (node) {
        if (node.id) {
            let arr = node.id.split('_')
            idsArray.push(arr[1]);
        }
    });
    for (let i = 0; i < vnodeList.length; i++) {
        if (idsArray.indexOf(vnodeList[i].id.split('_')[1]) == -1) body.removeChild(vnodeList[i]);
    }
    for (let i = 0; i < idsArray.length; i++) {
        let vNode = document.querySelector("#_" + idsArray[i]);
        if (idsArray[i] == "null") continue;
        var rect = nodeList[i].getBoundingClientRect();
        if (vNode == null) {
            vNode = document.createElement('div');
            vNode.classList.add('v-node')
            vNode.id = '_' + idsArray[i];
            vNode.innerHTML = nodeList[i].innerHTML;
            body.appendChild(vNode);
            vNode.style.transform = `translate(${rect.left - 10}px, ${rect.top - 10}px)`
        }
        else {
            vNode.style.transform = `translate(${rect.left - 10}px, ${rect.top - 10}px)`
            vNode.innerHTML = nodeList[i].innerHTML
        }
        if (current != null && idsArray[i] == current.element) vNode.style.backgroundColor = "#FFAB91"
        else {
            let blueValue = Number(nodeList[i].getAttribute('colorvalue'))
            blueValue = blueValue.toString(16)
            if (blueValue.length < 2) blueValue = '0' + blueValue;
            vNode.style.backgroundColor = "#00ff" + blueValue;
        }
    }
    renderLines("#left");
    renderLines("#center");
    renderLines("#right");
}


function renderNodes(rootNode, kind) {
    let app = document.querySelector("#" + kind)
    const html = `
        <div class="tree-container">${renderNode(rootNode, null, 'r')}</div>
        <div class="svg-container"></div>
    `
    app.innerHTML = html
}

function renderNode(tree, parentId, kind) {
    return tree == null ? `
        <div class="tree">

            <div id="${kind + "_" + 'null' + '_' + parentId}" parent-id="${parentId}" class="${parentId == null ? 'root-node' : 'tree-node'} node" colorvalue="255">
                <br>null
            </div>
            <div class="tree-children">
            </div>
        </div>
    `: `
        <div class="tree">

            <div id="${kind + "_" + tree.element}" parent-id="${parentId}" class="${parentId == null ? 'root-node' : 'tree-node'} node" colorvalue="${tree.color}">
                <br>v:${tree.element}<br>n:${tree.time}
            </div>
            <div class="tree-children">
             ${renderNode(tree.leftChild, kind + "_" + tree.element, "l") + renderNode(tree.rightChild, kind + "_" + tree.element, "r")}
            </div>
        </div>
    `
}

function renderLines(tree) {
    const t = document.querySelector(tree)
    const nodes = t.querySelectorAll('.tree-node')
    let fragment = document.createElement('div')
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        const nodeId = node.getAttribute('id')
        if (nodeId.split('_')[1] == 'null') continue;
        const parentId = node.getAttribute('parent-id')
        const line = renderLine(t, `line-${nodeId}-${parentId}`)
        fragment.appendChild(line)
    }
    const svgContainer = t.querySelector('.svg-container')
    svgContainer.innerHTML = fragment.innerHTML
}

function renderLine(root, id) {
    const line = root.querySelector(`.${id}`)
    let svg = null,
        path = null
    if (!line) {
        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttributeNS('http://www.w3.org/2000/svg', 'd', '')
        svg.appendChild(path)
        svg.setAttribute('id', id)
    } else {
        svg = line
        path = svg.querySelector('path')
    }
    const arr = id.split('-')
    const nodeId = arr[1]
    const parentId = arr[2]
    const node = root.querySelector("#" + nodeId)
    const parentNode = root.querySelector("#" + parentId)

    const { x: nx, y: ny } = getNodePosition(node)
    const { w: nw, h: nh } = getNodeSize(node)
    const { x: px, y: py } = getNodePosition(parentNode)
    const { w: pw, h: ph } = getNodeSize(parentNode)

    let width, height, left, top
    let d
    height = (ny + nh / 2) - (py + ph / 2)
    top = py + ph / 2
    if (px > nx) {
        width = (px + pw / 2) - (nx + nw / 2)
        left = nx + nw / 2
        d = `M${width} 0 L0 ${height}` //从右上角至左下角画线
    } else if (px < nx) {
        width = (nx + nw / 2) - (px + pw / 2)
        left = px + pw / 2
        d = `M0 0 L${width} ${height}` //从左上角至右下角画线
    } else {
        width = 2
        left = px + pw / 2
        d = `M ${width / 2} 0 L${width / 2} ${height}` //画一条竖直向下的线
    }

    const length = Math.round(Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)))
    const val = length - (pw / 2 + nw / 2)

    svg.setAttribute('width', width)
    svg.setAttribute('height', height)
    path.setAttributeNS('http://www.w3.org/2000/svg', 'd', d)
    path.setAttribute('style', `stroke:black;stroke-dasharray:${val};stroke-dashoffset:-${pw / 2}`)
    svg.style = `position:absolute;left:${left}px;top:${top}px`
    return svg
}

function getNodePosition(node) {
    const { x, y } = node.getBoundingClientRect()
    return { x, y }
}

function getNodeSize(node) {
    const { width, height } = window.getComputedStyle(node)
    return { w: getNumFromPx(width), h: getNumFromPx(height) }
}

function getNumFromPx(str) {
    return Number(str.substring(0, str.indexOf('p')))
}

document.getElementById('submitA').addEventListener('click', async function () {
    let a = document.getElementById('inputA').value;
    buttons(true)
    await splaytree.insert(Number(a));
    current = null
    await draw()
    await sleep(speed)
    buttons(false)
    console.log('插入:', a);
});

document.getElementById('submitB').addEventListener('click', async function () {
    let b = document.getElementById('inputB').value;
    buttons(true)
    await splaytree.erase(Number(b));
    current = null
    await draw()
    await sleep(speed)
    let nodeList = splaytree.inOrder();
    nodeList.forEach((node) => {
        if (node == splaytree.root) node.color = 0;
        else node.color = Math.min(node.color + 34, 255);
    })
    await draw()
    await sleep(speed)
    buttons(false)
    console.log('删除:', b);
});

document.getElementById('submitC').addEventListener('click', async function () {
    let c = document.getElementById('inputC').value;
    buttons(true)
    await (async (element) => {
        if (k) {
            let temp = new Node(0);
            let left = temp, right = temp;
            splaytree.left = temp.rightChild;
            splaytree.right = temp.leftChild;
            while (splaytree.root.element !== element) {
                current = splaytree.root
                splaytree.left = temp.rightChild;
                splaytree.right = temp.leftChild;
                await draw();
                await sleep(speed)
                if (splaytree.root.element < element) {
                    let nextNode = splaytree.root.rightChild;
                    if (nextNode == null) break;
                    if (nextNode.element < element && nextNode.rightChild !== null) {
                        splaytree.root.rightChild = nextNode.leftChild;
                        nextNode.leftChild = splaytree.root;
                        splaytree.root = nextNode;
                    }//RR旋转
                    left.rightChild = splaytree.root;
                    left = splaytree.root;
                    splaytree.root = splaytree.root.rightChild;
                    left.rightChild = null;
                }
                else {
                    let nextNode = splaytree.root.leftChild;
                    if (nextNode == null) break;
                    if (nextNode.element > element && nextNode.leftChild !== null) {
                        splaytree.root.leftChild = nextNode.rightChild;
                        nextNode.rightChild = splaytree.root;
                        splaytree.root = nextNode;
                    }//LL旋转
                    right.leftChild = splaytree.root;
                    right = splaytree.root;
                    splaytree.root = splaytree.root.leftChild;
                    right.leftChild = null;
                }
            }
            left.rightChild = splaytree.root.leftChild;
            right.leftChild = splaytree.root.rightChild;
            splaytree.root.leftChild = temp.rightChild;
            splaytree.root.rightChild = temp.leftChild;
            splaytree.left = null;
            splaytree.right = null;
            current = splaytree.root;
            await draw();
            await sleep(speed)
        }
        else {
            let order = new Array;
            current = splaytree.root;
            while (current.element != element) {
                await draw();
                await sleep(speed)
                order.push(current);
                if (current.element > element) {
                    if (current.leftChild == null) break;
                    current = current.leftChild;
                } else {
                    if (current.rightChild == null) break;
                    current = current.rightChild;
                }
            }
            if (current.element != element) order.pop();
            for (let i = order.length - 1; i >= 0; i--) {
                await draw();
                await sleep(speed)
                if (i - 1 >= 0) {
                    i = i - 1;
                    if (order[i].leftChild == order[i + 1] && order[i + 1].leftChild == current) {
                        order[i].leftChild = order[i + 1].rightChild;
                        order[i + 1].rightChild = order[i];
                        order[i + 1].leftChild = current.rightChild;
                        current.rightChild = order[i + 1];
                    } else if (order[i].rightChild == order[i + 1] && order[i + 1].rightChild == current) {
                        order[i].rightChild = order[i + 1].leftChild;
                        order[i + 1].leftChild = order[i];
                        order[i + 1].rightChild = current.leftChild;
                        current.leftChild = order[i + 1];
                    } else if (order[i].leftChild == order[i + 1] && order[i + 1].rightChild == current) {
                        order[i].leftChild = current.rightChild;
                        order[i + 1].rightChild = current.leftChild;
                        current.leftChild = order[i + 1];
                        current.rightChild = order[i];
                    } else if (order[i].rightChild == order[i + 1] && order[i + 1].leftChild == current) {
                        order[i].rightChild = current.leftChild;
                        order[i + 1].leftChild = current.rightChild;
                        current.rightChild = order[i + 1];
                        current.leftChild = order[i];
                    }
                    if (i - 1 >= 0) {
                        if (order[i - 1].leftChild == order[i]) order[i - 1].leftChild = current;
                        else order[i - 1].rightChild = current;
                    }
                } else {
                    if (current == order[i].leftChild) {
                        order[i].leftChild = current.rightChild;
                        current.rightChild = order[i];
                    }
                    else if (current == order[i].rightChild) {
                        order[i].rightChild = current.leftChild;
                        current.leftChild = order[i];
                    }
                }
            }
            splaytree.root = current;
            await draw();
            await sleep(speed)
        }
    }
    )(Number(c));
    current = null
    await draw();
    await sleep(speed)
    let nodeList = splaytree.inOrder();
    nodeList.forEach((node) => {
        if (node == splaytree.root) node.color = 0;
        else node.color = Math.min(node.color + 34, 255);
    })
    await draw()
    await sleep(speed)
    buttons(false);
    console.log('查找:', c);
});

function buttons(isAble) {
    document.getElementById('submitA').disabled = isAble;
    document.getElementById('submitB').disabled = isAble;
    document.getElementById('submitC').disabled = isAble;
}

splaytree = new SplayTree();
init()
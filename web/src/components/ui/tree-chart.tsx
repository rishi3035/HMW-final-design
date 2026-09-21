/* eslint-disable react/jsx-handler-names */
import React, { useState, useMemo, useCallback } from "react";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";
import {
  HierarchyPointNode,
  HierarchyPointLink,
} from "@visx/hierarchy/lib/types";
import { LinearGradient } from "@visx/gradient";
import { pointRadial } from "d3-shape";
import {
  LinkRadial,
  LinkVertical,
  LinkHorizontal,
  LinkHorizontalStep,
  LinkVerticalStep,
  LinkRadialStep,
  LinkHorizontalLine,
  LinkVerticalLine,
  LinkRadialLine,
  LinkHorizontalCurve,
  LinkVerticalCurve,
  LinkRadialCurve,
} from "@visx/shape";

const mainBackground = "#272b4d";
const rootNodeFill = "#fa7268";
const nodeBorderColor = "#00f2e0";
const leafTextColor = "white";
const parentTextColor = "white";
const linkColor = "#f584e0";

const useForceUpdate = () => {
  const [, update] = useState(0);
  return useCallback(() => update((prev) => prev + 1), []);
};

export interface TreeNode {
  name: string;
  isExpanded?: boolean;
  children?: TreeNode[];
}

export const defaultTreeData: TreeNode = {
  name: "T",
  children: [
    {
      name: "A",
      children: [
        { name: "A1" },
        { name: "A2" },
        { name: "A3" },
        {
          name: "C",
          children: [
            {
              name: "C1",
            },
            {
              name: "D",
              children: [
                {
                  name: "D1",
                },
                {
                  name: "D2",
                },
                {
                  name: "D3",
                },
              ],
            },
          ],
        },
      ],
    },
    { name: "Z" },
    {
      name: "B",
      children: [{ name: "B1" }, { name: "B2" }, { name: "B3" }],
    },
  ],
};

const getLinkComponent = ({
  layout,
  linkType,
  orientation,
}: {
  layout: string;
  linkType: string;
  orientation: string;
}) => {
  if (layout === "polar") {
    if (linkType === "step") {
      return LinkRadialStep;
    }
    if (linkType === "line") {
      return LinkRadialLine;
    }
    if (linkType === "curve") {
      return LinkRadialCurve;
    }
    return LinkRadial;
  }
  if (orientation === "vertical") {
    if (linkType === "step") {
      return LinkVerticalStep;
    }
    if (linkType === "line") {
      return LinkVerticalLine;
    }
    if (linkType === "curve") {
      return LinkVerticalCurve;
    }
    return LinkVertical;
  }
  if (linkType === "step") {
    return LinkHorizontalStep;
  }
  if (linkType === "line") {
    return LinkHorizontalLine;
  }
  if (linkType === "curve") {
    return LinkHorizontalCurve;
  }
  return LinkHorizontal;
};

function RootNode({
  node,
  top,
  left,
  forceUpdate,
  customRootNodeFill,
  customNodeBorderColor,
  customParentTextColor,
}: {
  node: HierarchyPointNode<TreeNode>;
  top: number;
  left: number;
  forceUpdate: () => void;
  customRootNodeFill?: string;
  customNodeBorderColor?: string;
  customParentTextColor?: string;
}) {
  const radius = 12;
  return (
    <Group top={top} left={left}>
      <circle
        r={radius}
        fill={customRootNodeFill || rootNodeFill}
        stroke={customNodeBorderColor || nodeBorderColor}
        strokeWidth={1}
        strokeDasharray="2,2"
        onClick={() => {
          node.data.isExpanded = !node.data.isExpanded;
          forceUpdate();
        }}
      />
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
        fill={customParentTextColor || parentTextColor}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

function Node({
  node,
  top,
  left,
  forceUpdate,
  customBackground,
  customNodeBorderColor,
  customParentTextColor,
  customLeafTextColor,
}: {
  node: HierarchyPointNode<TreeNode>;
  top: number;
  left: number;
  forceUpdate: () => void;
  customBackground?: string;
  customNodeBorderColor?: string;
  customParentTextColor?: string;
  customLeafTextColor?: string;
}) {
  const width = 40;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;

  const isParentInData = !!node.data.children && node.data.children.length > 0;

  return (
    <Group top={top} left={left}>
      <rect
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        fill={customBackground || mainBackground}
        stroke={customNodeBorderColor || nodeBorderColor}
        strokeWidth={1}
        strokeDasharray={isParentInData ? "0" : "2,2"}
        rx={isParentInData ? 4 : 10}
        onClick={() => {
          node.data.isExpanded = !node.data.isExpanded;
          forceUpdate();
        }}
      />
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
        fill={
          isParentInData
            ? customParentTextColor || parentTextColor
            : customLeafTextColor || leafTextColor
        }
      >
        {node.data.name}
      </text>
    </Group>
  );
}

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

export type TreeChartProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  layout?: string;
  orientation?: string;
  linkType?: string;
  stepPercent?: number;
  treeData?: TreeNode;
  backgroundColor?: string;
  linkColor?: string;
  nodeBorderColor?: string;
  rootNodeFill?: string;
  parentTextColor?: string;
  leafTextColor?: string;
};

export const TreeChart = ({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
  layout = "cartesian",
  orientation = "horizontal",
  linkType = "diagonal",
  stepPercent = 0.5,
  treeData = defaultTreeData,
  backgroundColor = mainBackground,
  linkColor: customLinkColor = linkColor,
  nodeBorderColor: customNodeBorderColor,
  rootNodeFill: customRootNodeFill,
  parentTextColor: customParentTextColor,
  leafTextColor: customLeafTextColor,
}: TreeChartProps) => {
  const forceUpdate = useForceUpdate();

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  let origin: { x: number; y: number };
  let sizeWidth: number;
  let sizeHeight: number;

  if (layout === "polar") {
    origin = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    sizeWidth = 2 * Math.PI;
    sizeHeight = Math.min(innerWidth, innerHeight) / 2;
  } else {
    origin = { x: 0, y: 0 };
    if (orientation === "vertical") {
      sizeWidth = innerWidth;
      sizeHeight = innerHeight;
    } else {
      sizeWidth = innerHeight;
      sizeHeight = innerWidth;
    }
  }

  const LinkComponent = getLinkComponent({ layout, linkType, orientation });

  const rootNode = useMemo(
    () => hierarchy<TreeNode>(treeData, (d) => (d.isExpanded ? null : d.children)),
    [treeData, forceUpdate],
  );

  return totalWidth < 10 ? null : (
    <div>
      <svg width={totalWidth} height={totalHeight}>
        <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
        <rect
          width={totalWidth}
          height={totalHeight}
          rx={14}
          fill={backgroundColor}
        />
        <Group top={margin.top} left={margin.left}>
          <Tree
            root={rootNode}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / 0.5}
          >
            {(tree) => (
              <Group top={origin.y} left={origin.x}>
                {tree.links().map((link, i) => (
                  <LinkComponent
                    key={i}
                    data={link}
                    percent={linkType === "step" ? stepPercent : undefined}
                    stroke={customLinkColor}
                    strokeWidth="1.5"
                    fill="none"
                  />
                ))}

                {tree.descendants().map((node, key) => {
                  let top: number;
                  let left: number;
                  if (layout === "polar") {
                    const [radialX, radialY] = pointRadial(node.x, node.y);
                    top = radialY;
                    left = radialX;
                  } else if (orientation === "vertical") {
                    top = node.y;
                    left = node.x;
                  } else {
                    top = node.x;
                    left = node.y;
                  }

                  if (node.depth === 0) {
                    return (
                      <RootNode
                        key={key}
                        node={node}
                        top={top}
                        left={left}
                        forceUpdate={forceUpdate}
                        customRootNodeFill={customRootNodeFill}
                        customNodeBorderColor={customNodeBorderColor}
                        customParentTextColor={customParentTextColor}
                      />
                    );
                  }
                  return (
                    <Node
                      key={key}
                      node={node}
                      top={top}
                      left={left}
                      forceUpdate={forceUpdate}
                      customBackground={backgroundColor}
                      customNodeBorderColor={customNodeBorderColor}
                      customParentTextColor={customParentTextColor}
                      customLeafTextColor={customLeafTextColor}
                    />
                  );
                })}
              </Group>
            )}
          </Tree>
        </Group>
      </svg>
    </div>
  );
};

export default TreeChart;

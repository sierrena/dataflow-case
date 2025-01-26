import React, { useMemo } from "react";
import { ReactFlow, ReactFlowProvider, Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useDataContext } from "../context/DataContext";

const DiagramPage: React.FC = () => {
  const { teams } = useDataContext();

  const { nodes, edges } = useMemo(() => {
    const nodeList: Node[] = [];
    const edgeList: Edge[] = [];

    teams.forEach((team, teamIndex) => {
      nodeList.push({
        id: team.id,
        data: { label: team.name },
        position: { x: teamIndex * 220, y: 0 },
        type: "default",
        style: {
          background: "#ADE8F4",
          border: "1px solid #0077B6",
          borderRadius: 8,
        },
      });

      team.users.forEach((user, userIndex) => {
        const userNodeId = `${team.id}-${user.id}`;
        nodeList.push({
          id: userNodeId,
          data: { label: user.name },
          position: { x: teamIndex * 220, y: (userIndex + 1) * 100 },
          type: "default",
          style: {
            background: "#ADE8F4",
            border: "1px solid #0077B6",
            borderRadius: 8,
          },
        });

        edgeList.push({
          id: `edge-${team.id}-${user.id}`,
          source: team.id,
          target: userNodeId,
          type: "default",
          style: {
            background: "#ADE8F4",
            border: "1px solid #0077B6",
            borderRadius: 8,
          },
        });
      });
    });

    return { nodes: nodeList, edges: edgeList };
  }, [teams]);

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
      }}
    >
      <ReactFlowProvider>
        <ReactFlow nodes={nodes} edges={edges} fitView />
      </ReactFlowProvider>
    </div>
  );
};

export default DiagramPage;

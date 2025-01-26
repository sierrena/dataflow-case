import React, { useMemo, useCallback, useState } from "react";
import { ReactFlow, ReactFlowProvider, Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useDataContext } from "../context/DataContext";

const DiagramPage: React.FC = () => {
  const { teams, removeUser } = useDataContext();
  const [hiddenTeams, setHiddenTeams] = useState<string[]>([]);
  const toggleTeamHidden = useCallback((teamId?: string) => {
    if (!teamId) return;
    setHiddenTeams(
      (prev) =>
        prev.includes(teamId)
          ? prev.filter((id) => id !== teamId) // unhide
          : [...prev, teamId] // hide
    );
  }, []);

  type NodeContextMenuHandler = (event: React.MouseEvent, node: Node) => void;

  const handleNodeContextMenu: NodeContextMenuHandler = useCallback(
    (event, node) => {
      event.preventDefault();
      const { teamId, userId } = node.data || {};

      if (userId) {
        console.log("Removing user:", userId, "from team:", teamId);
        removeUser(teamId, userId);
      } else {
        console.log("Toggling hidden for team:", teamId);
        toggleTeamHidden(teamId);
      }
    },
    [removeUser, toggleTeamHidden]
  );
  const { nodes, edges } = useMemo(() => {
    const nodeList: Node[] = [];
    const edgeList: Edge[] = [];

    teams.forEach((team, teamIndex) => {
      nodeList.push({
        id: team.id,
        data: {
          label: team.name,
          teamId: team.id,
        },
        position: { x: teamIndex * 220, y: 0 },
        type: "default",
        style: {
          background: "#ADE8F4",
          border: "1px solid #0077B6",
          borderRadius: 8,
        },
      });

      if (hiddenTeams.includes(team.id)) {
        return;
      }

      team.users.forEach((user, userIndex) => {
        nodeList.push({
          id: user.id,
          data: {
            label: user.name,
            userId: user.id,
            teamId: team.id,
          },
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
          target: user.id,
          type: "default",
        });
      });
    });

    return { nodes: nodeList, edges: edgeList };
  }, [teams, hiddenTeams]);

  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 60px)",
        border: "1px solid #ccc",
        margin: "0 auto",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
      }}
    >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          onNodeContextMenu={handleNodeContextMenu}
        />
      </ReactFlowProvider>
    </div>
  );
};

export default DiagramPage;

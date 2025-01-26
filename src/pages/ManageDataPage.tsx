import React, { useState } from "react";
import { useDataContext } from "../context/DataContext";

const ManageDataPage: React.FC = () => {
  const { teams, addTeam, addUser } = useDataContext();

  const [teamName, setTeamName] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim()) {
      addTeam(teamName.trim());
      setTeamName("");
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTeam && userName.trim()) {
      addUser(selectedTeam, { name: userName.trim(), email: userEmail.trim() });
      setUserName("");
      setUserEmail("");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Manage Teams and Users</h2>

      <form onSubmit={handleAddTeam} style={{ marginBottom: "2rem" }}>
        <label>Team Name:</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <button type="submit">Add Team</button>
      </form>

      <form onSubmit={handleAddUser}>
        <label>Select Team:</label>
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          required
        >
          <option value="">-- Select a team --</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>

        <label>User Name:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <label>User Email:</label>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <button type="submit">Add User</button>
      </form>

      <div style={{ marginTop: "2rem" }}>
        <h3>Current Teams and Users</h3>
        <ul>
          {teams.map((team) => (
            <li key={team.id}>
              <b>{team.name}</b> - Users:
              <ul>
                {team.users.map((user) => (
                  <li key={user.id}>
                    {user.name} ({user.email || "No email"})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageDataPage;

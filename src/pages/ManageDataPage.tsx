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
    <div>
      <h2>Manage Teams and Users</h2>

      <form className="form-section" onSubmit={handleAddTeam}>
        <div>
          <label>Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Team</button>
      </form>

      <form className="form-section" onSubmit={handleAddUser}>
        <div>
          <label>Select Team</label>
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
        </div>

        <div>
          <label>User Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>User Email</label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        <button type="submit">Add User</button>
      </form>

      <div className="teams-list">
        <h3>Current Teams and Users</h3>
        {teams.map((team) => (
          <div key={team.id} style={{ marginBottom: "1rem" }}>
            <b>{team.name}</b> - Users:
            <ul>
              {team.users.map((user) => (
                <li key={user.id}>
                  {user.name} ({user.email || "No email"})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDataPage;

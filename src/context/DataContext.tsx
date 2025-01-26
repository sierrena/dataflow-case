import React, { createContext, useState, useContext } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

type Team = {
  id: string;
  name: string;
  users: User[];
};

type DataContextProps = {
  teams: Team[];
  addTeam: (name: string) => void;
  addUser: (teamId: string, user: Omit<User, "id">) => void;
  removeUser: (teamId: string, userId: string) => void;
};

const DataContext = createContext<DataContextProps | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const addTeam = (name: string) => {
    setTeams((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        users: [],
      },
    ]);
  };

  const addUser = (teamId: string, user: Omit<User, "id">) => {
    setTeams((prev) =>
      prev.map((team) => {
        if (team.id === teamId) {
          const newUser: User = {
            id: crypto.randomUUID(),
            ...user,
          };
          return { ...team, users: [...team.users, newUser] };
        }
        return team;
      })
    );
  };

  const removeUser = (teamId: string, userId: string) => {
    console.log("Removing user:", userId, "from team:", teamId);
    setTeams((prev) =>
      prev.map((team) => {
        if (team.id === teamId) {
          return { ...team, users: team.users.filter((u) => u.id !== userId) };
        }
        return team;
      })
    );
  };

  return (
    <DataContext.Provider
      value={{
        teams,
        addTeam,
        addUser,
        removeUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context)
    throw new Error("useDataContext must be used within a DataProvider");
  return context;
};

import React from "react";
import { Link } from "@remix-run/react";

interface OrganizationCardProps {
  id: string;
  name: string;
  description: string;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({ id, name, description }) => {
  return (
    <Link to={`/organization-dashboard/${id}`} className="block">
      <div className="border rounded p-4">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default OrganizationCard;

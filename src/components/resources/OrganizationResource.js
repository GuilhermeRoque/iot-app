import React from "react";
import { Outlet } from "react-router-dom";
import { OrganizationProvider } from "../../context/organization-context";

const OrganizationResource = () => {
      return (<OrganizationProvider><Outlet/></OrganizationProvider>)
  };

export default OrganizationResource
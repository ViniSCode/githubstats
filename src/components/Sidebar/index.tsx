import { HStack, Stack } from "@chakra-ui/react";
import { RiDashboardLine, RiGitRepositoryLine } from "react-icons/ri";
import { FiUsers, FiUserPlus } from "react-icons/Fi";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function Sidebar () {
  return (
    <Stack spacing="12" align="flex-start">
        <NavSection title="GERAL">
          <NavLink icon={RiDashboardLine} href="/dashboard">Overview</NavLink>
          <NavLink icon={RiGitRepositoryLine} href="/repositories">Repositories</NavLink>
        </NavSection>

        <NavSection title="PROFILE">
          <NavLink icon={FiUsers} href="/following">Following</NavLink>
          <NavLink icon={FiUserPlus} href="/followers">Followers</NavLink>
        </NavSection>
    </Stack>
  );
}
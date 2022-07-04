import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiFolderLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav () {
  return (
    <Stack spacing="12" align="flex-start">
    <NavSection title="GERAL">
      <NavLink icon={RiDashboardLine} href="/dashboard">Overview</NavLink>
      <NavLink icon={RiFolderLine} href="/repos">Repositories</NavLink>
    </NavSection>
    <NavSection title="PROFILE">
      <NavLink icon={RiInputMethodLine} href="/following">Following</NavLink>
      <NavLink icon={RiGitMergeLine} href="/followers">Followers</NavLink>
    </NavSection>
  </Stack>
  );
}
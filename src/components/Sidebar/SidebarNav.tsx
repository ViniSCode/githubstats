import { Stack } from "@chakra-ui/react";
import { RiDashboardLine, RiFolderLine, RiGitMergeLine, RiInputMethodLine, RiStarLine } from "react-icons/ri";
import { useAppContext } from "../../hooks/useAppContext";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav () {
  const { user } = useAppContext();

  return (
    <Stack spacing="12" align="flex-start">
    <NavSection title="GERAL">
      <NavLink icon={RiDashboardLine} href={`/${user}`}>Overview</NavLink>
      <NavLink icon={RiFolderLine} href={`/${user}/repos`}>Repositories</NavLink>
      <NavLink icon={RiStarLine} href={`/${user}/starred`}>Starred</NavLink>
    </NavSection>
    <NavSection title="PROFILE">
      <NavLink icon={RiInputMethodLine} href="/following">Following</NavLink>
      <NavLink icon={RiGitMergeLine} href="/followers">Followers</NavLink>
    </NavSection>
  </Stack>
  );
}
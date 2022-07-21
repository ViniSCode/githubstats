import { Box, Button, Stack } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiDashboardLine, RiFolderLine, RiGitMergeLine, RiInputMethodLine, RiLogoutBoxLine, RiLogoutBoxRLine, RiLogoutCircleLine, RiStarFill, RiStarLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav () {
  
  async function handleLogout () {
    await signOut();
  }

  return (
    <Stack spacing="12" align="flex-start">
    <NavSection title="GERAL">
      <NavLink icon={RiDashboardLine} href="/dashboard">Overview</NavLink>
      <NavLink icon={RiFolderLine} href="/repos">Repositories</NavLink>
      <NavLink icon={RiStarLine} href="/starred">Starred</NavLink>
    </NavSection>
    <NavSection title="PROFILE">
      <NavLink icon={RiInputMethodLine} href="/following">Following</NavLink>
      <NavLink icon={RiGitMergeLine} href="/followers">Followers</NavLink>
      <Box onClick={handleLogout}>
        <NavLink icon={RiLogoutCircleLine} isLogout>Logout</NavLink>
      </Box>
    </NavSection>
  </Stack>
  );
}
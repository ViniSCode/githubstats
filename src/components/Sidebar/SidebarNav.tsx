import { Stack } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { RiDashboardLine, RiFolderLine, RiStarLine, RiUserHeartLine } from "react-icons/ri";
import { useAppContext } from "../../hooks/useAppContext";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav () {
  const { user } = useAppContext();

  return (
    <Stack spacing="12" align="flex-start">
    <NavSection title="GERAL">
      <NavLink icon={RiDashboardLine} href={`/${user.id}`}>Overview</NavLink>
      <NavLink icon={RiFolderLine} href={`/${user.id}/repos`}>Repositories</NavLink>
      <NavLink icon={RiStarLine} href={`/${user.id}/starred`}>Starred</NavLink>
    </NavSection>
    {
      user.type === "User" ? (
      <NavSection title="PROFILE">
        <NavLink icon={AiOutlineHeart} href={`/${user.id}/followers`}>Followers</NavLink>
        <NavLink icon={RiUserHeartLine} href={`/${user.id}/following`}>Following</NavLink>
      </NavSection>
      ) : user.type === 'Organization' && (
        <NavSection title="ORGANIZATION">
          <NavLink icon={BsPerson} href={`/${user.id}/members`}>Members</NavLink>
        </NavSection>
      ) 
    }
  </Stack>
  );
}
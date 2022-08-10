import { useContext } from "react";
import { ReposContext } from "../Context/ReposContext";
import { StarredReposContext } from "../Context/StarredReposContext";
import { UserGithubSessionContext } from "../Context/UserGithubSessionContext";

export function useRepos () {
  const { repos, reposTotalCount } = useContext(ReposContext);

  return {
    repos,
    reposTotalCount,
  }
}

export function useUserGithubId () {
  const { githubUserId } = useContext(UserGithubSessionContext);

  return { 
    githubUserId
  }
}

export function useStarredRepos () {
  const { starredRepos, starredTotalCount} = useContext(StarredReposContext);

  return {
    starredRepos,
    starredTotalCount,
  }
}
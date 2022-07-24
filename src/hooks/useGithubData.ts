import { useContext } from "react";
import { ReposContext } from "../Context/ReposContext";
import { StarredReposContext } from "../Context/StarredReposContext";
import { UserContext } from "../Context/UserContext";

export function useGithubData () {
  const { userData, userGithubId } = useContext(UserContext);
  
  return {
    userData,
    userGithubId,
  }
}

export function useRepos () {
  const { repos, reposTotalCount } = useContext(ReposContext);

  return {
    repos,
    reposTotalCount,
  }
}

export function useStarredRepos () {
  const { starredRepos, starredTotalCount} = useContext(StarredReposContext);

  return {
    starredRepos,
    starredTotalCount,
  }
}
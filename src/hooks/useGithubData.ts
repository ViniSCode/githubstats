import { useContext } from "react";
import { ReposContext } from "../Context/ReposContext";
import { StarredReposContext } from "../Context/StarredReposContext";

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
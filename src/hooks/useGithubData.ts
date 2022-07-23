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
  const { repos } = useContext(ReposContext);

  return {
    repos
  }
}

export function useStarredRepos () {
  const { starredRepos } = useContext(StarredReposContext);

  return {
    starredRepos
  }
}
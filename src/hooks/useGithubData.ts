import { useContext } from "react";
import { GithubReposContext } from "../Context/GithubReposContext";
import { GithubUserContext } from "../Context/GithubUserContext";

export function useGithubData () {
  const { userData, userGithubId } = useContext(GithubUserContext);
  
  return {
    userData,
    userGithubId,
  }
}

export function useGithubStarredRepos () {
  const { starredRepos } = useContext(GithubReposContext);

  return {
    starredRepos
  }
}
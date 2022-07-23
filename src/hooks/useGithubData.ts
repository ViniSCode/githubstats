import { useContext } from "react";
import { GithubReposContext } from "../Context/GithubReposContext";
import { GithubStarredReposContext } from "../Context/GithubStarredReposContext";
import { GithubUserContext } from "../Context/GithubUserContext";

export function useGithubData () {
  const { userData, userGithubId } = useContext(GithubUserContext);
  
  return {
    userData,
    userGithubId,
  }
}

export function useGithubRepos () {
  const { repos } = useContext(GithubReposContext);

  return {
    repos
  }
}

export function useGithubStarredRepos () {
  const { starredRepos } = useContext(GithubStarredReposContext);

  return {
    starredRepos
  }
}
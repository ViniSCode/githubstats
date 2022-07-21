import { useContext } from "react";
import { GithubUserContext } from "../Context/GithubUserContext";

export function useGithubData () {
  const { userData, userGithubId } = useContext(GithubUserContext);
  
  return {
    userData,
    userGithubId,
  }
}

export function useGithubStarredRepos () {
  const { userData, userGithubId } = useContext(GithubUserContext);

  return {
    userData,
    userGithubId,
  }
}
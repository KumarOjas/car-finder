import React from 'react';
import { Card } from '../components/ui/card';

const RepoCard = ({ repo }) => {
  return (
    <Card className="mb-4">
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>
      <div className="d-flex justify-content-between">
        <span>Stars: {repo.stargazers_count}</span>
        <span>Forks: {repo.forks_count}</span>
      </div>
    </Card>
  );
};

export default RepoCard;

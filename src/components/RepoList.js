import React from 'react';
import { ScrollArea } from '../components/ui/scroll-area';
import { Separator } from '../components/ui/separator';
import RepoCard from './RepoCard';

const RepoList = ({ repos }) => {
  return (
    <ScrollArea className="h-[300px]">
      {repos.map((repo, index) => (
        <React.Fragment key={repo.id}>
          <RepoCard repo={repo} />
          {index < repos.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </ScrollArea>
  );
};

export default RepoList;

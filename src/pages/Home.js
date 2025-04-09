import { useState } from 'react';
import RepoList from '../components/RepoList';
import { fetchGitHubProfile, fetchGitHubRepos } from '../utils/api';

const Home = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const [profileData, reposData] = await Promise.all([
        fetchGitHubProfile(username),
        fetchGitHubRepos(username)
      ]);
      setProfile(profileData);
      setRepos(reposData);
    } catch (err) {
      let errorMessage = 'Failed to fetch GitHub data';
      if (err.message.includes('Bad credentials')) {
        errorMessage = 'GitHub API authentication failed. Using limited access.';
      } else if (err.message.includes('rate limit')) {
        errorMessage = 'GitHub API rate limit exceeded. Try again later.';
      } else if (err.message.includes('Not Found')) {
        errorMessage = 'GitHub user not found. Please check the username.';
      }
      
      setError(errorMessage);
      setProfile(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="display-5 mb-5 text-center">GitHub Profile Analyzer</h1>
      
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <form onSubmit={handleSearch} className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button 
              className="btn btn-primary" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading GitHub data...</p>
        </div>
      ) : (
        profile && (
          <div className="mb-5">
            <div className="text-center mb-4">
              <img 
                src={profile.avatar_url} 
                alt={profile.name} 
                className="rounded-circle mb-3"
                width="120"
                height="120"
              />
              <h2>{profile.name || profile.login}</h2>
              <p className="text-muted">{profile.bio}</p>
              <div className="d-flex justify-content-center gap-3">
                <span>Followers: {profile.followers}</span>
                <span>Following: {profile.following}</span>
                <span>Repos: {profile.public_repos}</span>
              </div>
            </div>
            <RepoList repos={repos} />
          </div>
        )
      )}
    </div>
  );
};

export default Home;

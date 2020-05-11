import React from 'react';
import { useHistory } from 'react-router-dom';
import ProfileUser from '../components/profile/profile-user.component';
import MusifyAppBar from '../components/musifyappbar.component';
import SharePage from './share-page';
import MessagePage from './messages.page';

export default function ProfilePage() {
  const history = useHistory();
  return (
    <div>
      <MusifyAppBar />
      {history.location.pathname === '/share' ? (
        <SharePage />
      ) : history.location.pathname === '/message' ? (
        <MessagePage />
      ) : (
        <ProfileUser />
      )}
    </div>
  );
}

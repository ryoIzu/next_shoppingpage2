import { Button } from 'reactstrap';
// AuthContext.jsのuseAuthをインポートする
import { useAuth } from '../../context/authContext'
import { getAuth, signOut } from "firebase/auth";


const Header = () => {
  const { currentUser } = useAuth();
  // console.log(currentUser);

  return (
    <div style={{ padding: "1rem 0" }} >
      { currentUser ? (
        // useAuth()で取得した現在ログインしているユーザーのメールアドレスをcurrentUser.emailで表示
        <div suppressHydrationWarning={true}>
          <div style={{ paddingBottom: "1rem" }}>{ currentUser.email } でログインしています。</div>
        </div>
      ):(
        <div suppressHydrationWarning={true}>ログインしていません。</div>
      )}
    </div>
  );
}

export default Header;

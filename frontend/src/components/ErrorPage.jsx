import { Link } from "react-router";
import { Button } from "./Ui";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] bg-surface text-center px-6">
      {/* Error Info */}
      <h1 className="text-h1 text-primary mb-4 tracking-tight">404</h1>
      <h2 className="text-h3 text-slate-100 mb-2">찾을 수 없는 페이지입니다.</h2>
      <p className="text-body-18 text-slate-500 mb-12 max-w-[480px] leading-relaxed">
        페이지의 주소가 잘못 입력되었거나,<br />
        요청하신 페이지가 삭제되어 현재 이용할 수 없습니다.
      </p>

      {/* Call to Action */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="primary" size="large">
            홈으로 이동
          </Button>
        </Link>
        <Link to="/search">
          <Button variant="secondary" size="large">
            콘텐츠 검색
          </Button>
        </Link>
      </div>
    </div>
  );
}

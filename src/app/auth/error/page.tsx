import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-6 px-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">ログインに失敗しました</h1>
        <p className="mt-2 text-gray-600">
          もう一度お試しください。問題が続く場合はページを更新してください。
        </p>
      </div>
      <Link
        href="/"
        className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700"
      >
        トップに戻る
      </Link>
    </div>
  )
}

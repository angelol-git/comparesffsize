import ExportActions from "./ExportActions";

function AdminHeader({ cases }) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cases Admin</h1>
        <p className="mt-1 text-sm text-gray-700">
          Manage PC cases data (Development Mode Only)
        </p>
      </div>
      <ExportActions cases={cases} />
    </div>
  );
}

export default AdminHeader;

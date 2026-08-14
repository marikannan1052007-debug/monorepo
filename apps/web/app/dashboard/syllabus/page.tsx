import SyllabusList from "@/components/dashboard/syllabus-list";

export default function SyllabusPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          CDS Syllabus Tracker
        </h1>

        <p className="text-gray-400">
          Track your preparation topic by topic.
        </p>
      </div>

      <SyllabusList />

    </div>
  );
}
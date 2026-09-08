import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { useTeam } from '../lib/team'

const roleByIndex = [
  'Drilling Superintendent',
  'Well Engineer',
  'HSE Manager',
  'Rig Manager',
  'Mud Engineer',
  'Geologist',
  'Completion Engineer',
  'Logistics Coordinator',
  'Field Supervisor',
]

const bioByIndex = [
  'Nineteen years on offshore decks, four of them as night supervisor on deepwater semis in the Makassar Strait.',
  'Designs casing programs for sour gas wells and still finds time to mentor every junior engineer who asks.',
  'Runs the zero-harm program across all sites. Believes every incident is a story we failed to listen to early.',
  'Keeps three onshore rigs drilling through monsoon seasons without a missed crew change.',
  'Has mixed mud on four continents and brings back one useful trick from every basin.',
  'Reads pore pressure like weather. Called the Natuna overpressure zone two weeks before the logs did.',
  'Completion specialist focused on smart wells and remote actuation in high-temperature fields.',
  'Moves rigs, boats, and people across the archipelago, usually before anyone notices it was hard.',
  'Started as a roustabout in 2009. Now runs entire pad programs and trains the crews that replace him.',
]

export default function Teams() {
  const { members, loading, error, fetchMembers } = useTeam()

  useEffect(() => {
    if (useTeam.getState().members.length === 0) {
      fetchMembers()
    }
  }, [fetchMembers])

  return (
    <>
      <PageHero title="Our Teams" crumb="Teams" />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Our People"
            title="The specialists behind every delivery"
          />
          <p className="mt-6 max-w-2xl leading-relaxed text-body">
            One thousand two hundred field specialists keep NusaDrill running. Here is a rotating look at some of
            the people who anchor our crews, drawn live from our crew directory.
          </p>

          {loading && (
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-xl border border-line">
                  <div className="aspect-[4/3] animate-pulse bg-mist" />
                  <div className="space-y-3 p-6">
                    <div className="h-4 w-2/3 animate-pulse rounded bg-mist" />
                    <div className="h-3 w-1/3 animate-pulse rounded bg-mist" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <p className="mt-14 rounded-xl border border-line bg-mist p-8 text-center text-sm text-body">
              The crew directory is temporarily unavailable. Please refresh the page in a moment.
            </p>
          )}

          {!loading && !error && (
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member, index) => (
                <Reveal key={member.login.username} delay={(index % 3) * 100}>
                  <article className="group relative overflow-hidden rounded-xl bg-navy-900 transition-shadow duration-500 hover:shadow-2xl hover:shadow-navy-800/30">
                    <div className="overflow-hidden">
                      <img
                        src={member.picture.large}
                        alt={`${member.name.first} ${member.name.last}`}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
                    <span className="absolute left-5 top-5 rounded-full bg-amber-brand/90 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-navy-900">
                      {roleByIndex[index % roleByIndex.length]}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 transition-transform duration-500 group-hover:translate-y-0">
                      <h3 className="font-display text-xl font-bold text-white">
                        {member.name.first} {member.name.last}
                      </h3>
                      <p className="mt-1 max-h-0 overflow-hidden text-sm leading-relaxed text-white/70 opacity-0 transition-all duration-500 group-hover:max-h-28 group-hover:opacity-100">
                        {bioByIndex[index % bioByIndex.length]}
                      </p>
                      <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-amber-brand">
                        {member.location.city} · Since {new Date(member.registered.date).getFullYear()}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

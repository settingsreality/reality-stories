# How Time Works: a long widescreen explainer for the owner (not for posting). Voice 4. Voice tags = chapters (one generation each).
SCRIPT = [
 # 0 cold open
 ('h0', "Right now, your head is aging *faster* than your feet.", 'c0'),
 ('h0', "Not by much. Over a whole lifetime, less than a millionth of a second. But it's real, and we've measured it.", 'c0'),
 ('h1', "Time does not tick the same for everyone. How fast it runs depends on how fast you're moving, and how close you are to something heavy.", 'c0'),
 ('h1', "This is how that works, why it gets truly weird, and whether a warp drive could cheat it.", 'c0'),
 # 1 the one rule
 ('r1', "Everything starts with one strange fact about light.", 'c1'),
 ('r1', "Throw a ball forward from a moving train, and the ball's speed adds to the train's. Light doesn't do that.", 'c1'),
 ('r2', "Shine a flashlight from a rocket going half the speed of light, and the beam still moves at exactly the speed of light. Not one and a half times. The *same.*", 'c1'),
 ('r2', "Everyone who measures it, no matter how fast they're moving, gets the same number: about three hundred thousand kilometers every second.", 'c1'),
 ('r3', "That sounds harmless. It isn't. If the speed of light can't change, something else has to give. And that something is *time.*", 'c1'),
 # 2 the light clock
 ('k1', "Picture the simplest clock possible: a flash of light bouncing between two mirrors. Every bounce is one tick.", 'c2'),
 ('k1', "Put that clock on a fast spaceship. To the astronaut, nothing changes. The light goes straight up and down. Tick. Tick.", 'c2'),
 ('k2', "But watch from Earth. The ship is moving, so the light has to travel along a diagonal to reach the moving mirror. A *longer path.*", 'c2'),
 ('k2', "Light can't speed up to cover that longer path. So each tick takes longer. From Earth, the ship's clock is running *slow.*", 'c2'),
 ('k3', "And it's not just that clock. Heartbeats, thoughts, aging: everything on the ship slows by exactly the same amount. If it didn't, the astronaut could tell they were moving. They can't.", 'c2'),
 ('k4', "How much slower? At half the speed of light, about thirteen percent. At ninety percent, time runs at less than half speed. At ninety-nine percent, one year on the ship is seven years on Earth. At ninety-nine point nine nine percent, it's *seventy.*", 'c2'),
 # 3 muons
 ('m1', "This isn't a thought experiment. Nature runs the test above your head every second.", 'c3'),
 ('m1', "When cosmic rays slam into the upper atmosphere, about fifteen kilometers up, they make particles called muons. A muon lives for about two millionths of a second, then falls apart.", 'c3'),
 ('m2', "Even at nearly the speed of light, two millionths of a second is only enough to travel about six hundred and sixty meters. They should all die high in the sky.", 'c3'),
 ('m3', "But they reach the ground all the time. Every minute, about one passes through each square centimeter of the floor you're on.", 'c3'),
 ('m3', "Their clocks are running slow. At ninety-nine point eight percent of light speed, a muon's two microseconds stretch to more than thirty, as we see it. Enough for many of them to make it *all the way down.*", 'c3'),
 # 4 space squeezes
 ('q1', "Now ask the muon. From its point of view, its clock is perfectly normal. So how does it reach the ground?", 'c4'),
 ('q2', "Because from the muon's point of view, the atmosphere is squeezed. Those fifteen kilometers shrink to about *one.*", 'c4'),
 ('q2', "Moving fast doesn't only slow your time. It shortens the distances in the direction you're moving. Two different views, one result: the muon makes it.", 'c4'),
 # 5 the twins
 ('t1', "Which brings us to the most famous puzzle in physics. Two twins. One stays on Earth. The other flies to a star four light-years away, at ninety-nine and a half percent of the speed of light, and comes straight back.", 'c5'),
 ('t2', "On Earth, a little over eight years pass. On the ship, less than *ten months.*", 'c5'),
 ('t3', "But wait. From the ship, isn't Earth the one moving? Shouldn't Earth's clocks run slow instead?", 'c5'),
 ('t3', "The twins aren't equal. The Earth twin stays put the whole time. The traveler has to stop and turn around, and that turnaround changes which moment on Earth counts as *now.* For the traveler, Earth's clocks jump years ahead.", 'c5'),
 ('t4', "There's a cleaner way to see it. Draw time going up, and space going sideways. In this picture, the straight line has the *most* time on it. Any detour through space means less time. The traveler took the detour, so the traveler ages less.", 'c5'),
 # 6 the four lines (the owner's idea)
 ('a1', "So let's compare two travelers, side by side. Each one gets two lines: one for time, and one for distance.", 'c6'),
 ('a2', "Traveler A flies the normal way, at ninety-nine and a half percent of light speed, to that star four light-years away.", 'c6'),
 ('a2', "On Earth, the trip takes about four years. On A's clock, about five months. And from A's point of view, the distance itself shrank, from four light-years to about *zero point four.*", 'c6'),
 ('a3', "So A's distance line got shorter, and A's time line got shorter. But Earth's time line didn't. That gap is the problem. Come home, and everyone you knew got *years older.*", 'c6'),
 ('b1', "Traveler B has a warp drive. B doesn't push through space at all. B squeezes the space in front of the ship, stretches it out behind, and rides along in a calm bubble in the middle.", 'c6'),
 ('b2', "Inside the bubble, B is basically sitting still. And a clock that isn't moving through its own patch of space doesn't slow down.", 'c6'),
 ('b2', "So when the bubble carries B to the star, B's clock and Earth's clock tick together. If the trip takes a month for B, it takes a month on Earth too.", 'c6'),
 ('b3', "B's distance line is squeezed for real, not just from B's point of view. And both time lines shrink *together.* No gap. No one left behind.", 'c6'),
 ('b4', "The catch: a warp bubble needs something called negative energy, which may not exist. And if it ever went faster than light, some observers would see B arrive *before* B left.", 'c6'),
 # 7 gravity
 ('g1', "Speed isn't the only thing that changes time. *Gravity* does too.", 'c7'),
 ('g1', "The closer you are to a heavy mass, the slower your time runs. That's why your feet, a little closer to the Earth, age a little slower than your head.", 'c7'),
 ('g2', "GPS satellites feel both effects. Their speed slows their clocks by about seven microseconds a day. But they orbit twenty thousand kilometers up, in weaker gravity, and that speeds their clocks up by about forty-five.", 'c7'),
 ('g2', "Net result: thirty-eight microseconds fast, every day. GPS works by timing signals that travel at the speed of light, so left uncorrected, your position would drift about *ten kilometers a day.*", 'c7'),
 ('g3', "Every time your phone finds you on a map, it's using Einstein.", 'c7'),
 ('g4', "Near a black hole, it gets extreme. Close enough to the edge, one hour for you could be *years* for everyone far away.", 'c7'),
 # 8 no universal now
 ('n1', "And here's the strangest part. Because time stretches differently for everyone, there is no single *now* shared by the whole universe.", 'c8'),
 ('n1', "Two events that happen at the same moment for you can happen at different moments for someone moving past you. Neither of you is wrong.", 'c8'),
 ('n2', "Time isn't a river that flows the same everywhere. Everyone carries their own clock, and how fast it ticks depends on the path they take.", 'c8'),
 ('n3', "So if you could leave tonight, at nearly the speed of light, and come back to a future you'd never recognize... *would you go?*", 'c8'),
]

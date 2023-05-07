-- CreateTable
CREATE TABLE "Meetup" (
    "id" SERIAL NOT NULL,
    "topic" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "place" TEXT NOT NULL,

    CONSTRAINT "Meetup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagOnMeetup" (
    "id" SERIAL NOT NULL,
    "tagId" INTEGER NOT NULL,
    "meetupId" INTEGER NOT NULL,

    CONSTRAINT "TagOnMeetup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TagOnMeetup_tagId_meetupId_key" ON "TagOnMeetup"("tagId", "meetupId");

-- AddForeignKey
ALTER TABLE "TagOnMeetup" ADD CONSTRAINT "TagOnMeetup_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnMeetup" ADD CONSTRAINT "TagOnMeetup_meetupId_fkey" FOREIGN KEY ("meetupId") REFERENCES "Meetup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

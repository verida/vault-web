
import { getPublicProfile } from "@/features/profiles";
import { NextResponse } from "next/server";

/**
 * TODO: Function get public profile 
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    
    console.log('Get public profile', params.id)

    const profile = await getPublicProfile(params.id)
    return NextResponse.json(profile)

  } catch (error: unknown) {
    console.log('Get public profile', error);
    return new NextResponse('Internal Error', { status: 500 })
  }
}
